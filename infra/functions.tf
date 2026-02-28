# ---------------------------------------------------------------------------
# Service account for Cloud Functions runtime
# ---------------------------------------------------------------------------

resource "google_service_account" "function_runner" {
  account_id   = "function-runner"
  display_name = "Cloud Functions Runtime SA"
}

resource "google_project_iam_member" "function_runner_roles" {
  for_each = toset([
    "roles/datastore.user",
    "roles/storage.objectViewer",
    "roles/cloudfunctions.invoker"
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.function_runner.email}"
}

resource "google_service_account_iam_binding" "function_runner_binding" {
  service_account_id = google_service_account.function_runner.name
  role               = "roles/iam.serviceAccountUser"
  members = [
    "serviceAccount:github-deployer@doge-mage-backend.iam.gserviceaccount.com"
  ]
}


# ---------------------------------------------------------------------------
# get-scores
# ---------------------------------------------------------------------------

data "archive_file" "get_scores" {
  type        = "zip"
  source_dir  = "${path.module}/../functions/get-scores"
  output_path = "${path.module}/tmp/get-scores.zip"
}

resource "google_storage_bucket_object" "get_scores" {
  name   = "get-scores-${data.archive_file.get_scores.output_md5}.zip"
  bucket = google_storage_bucket.function_source.name
  source = data.archive_file.get_scores.output_path
}

resource "google_cloudfunctions2_function" "get_scores" {
  name     = "get-scores"
  location = var.region

  build_config {
    runtime     = "nodejs20"
    entry_point = "getScores"
    source {
      storage_source {
        bucket = google_storage_bucket.function_source.name
        object = google_storage_bucket_object.get_scores.name
      }
    }
  }

  service_config {
    min_instance_count    = 0
    max_instance_count    = 3
    available_memory      = "128Mi"
    service_account_email = google_service_account.function_runner.email
  }

  depends_on = [
    google_project_service.cloudfunctions,
    google_project_service.cloudbuild,
    google_project_service.run,
    google_project_service.artifactregistry,
  ]
}

resource "google_cloud_run_service_iam_member" "get_scores_public" {
  project  = var.project_id
  location = var.region
  service  = google_cloudfunctions2_function.get_scores.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# ---------------------------------------------------------------------------
# post-score
# ---------------------------------------------------------------------------

data "archive_file" "post_score" {
  type        = "zip"
  source_dir  = "${path.module}/../functions/post-score"
  output_path = "${path.module}/tmp/post-score.zip"
}

resource "google_storage_bucket_object" "post_score" {
  name   = "post-score-${data.archive_file.post_score.output_md5}.zip"
  bucket = google_storage_bucket.function_source.name
  source = data.archive_file.post_score.output_path
}

resource "google_cloudfunctions2_function" "post_score" {
  name     = "post-score"
  location = var.region

  build_config {
    runtime     = "nodejs20"
    entry_point = "postScore"
    source {
      storage_source {
        bucket = google_storage_bucket.function_source.name
        object = google_storage_bucket_object.post_score.name
      }
    }
  }

  service_config {
    min_instance_count    = 0
    max_instance_count    = 3
    available_memory      = "128Mi"
    service_account_email = google_service_account.function_runner.email
  }

  depends_on = [
    google_project_service.cloudfunctions,
    google_project_service.cloudbuild,
    google_project_service.run,
    google_project_service.artifactregistry,
  ]
}

resource "google_cloud_run_service_iam_member" "post_score_public" {
  project  = var.project_id
  location = var.region
  service  = google_cloudfunctions2_function.post_score.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
