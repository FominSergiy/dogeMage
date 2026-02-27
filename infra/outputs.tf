output "get_scores_url" {
  value       = google_cloudfunctions2_function.get_scores.service_config[0].uri
  description = "URL of the get-scores Cloud Function"
}

output "post_score_url" {
  value       = google_cloudfunctions2_function.post_score.service_config[0].uri
  description = "URL of the post-score Cloud Function"
}
