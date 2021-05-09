export const BOARD_SIZE = 5;
export const MAGE_START_POS = 12;
export const IMG = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e32c26ba-2bab-4113-ae4d-2e0fddb012f3/dbhkef2-0480b859-092c-47fc-ba78-5f299736997e.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UzMmMyNmJhLTJiYWItNDExMy1hZTRkLTJlMGZkZGIwMTJmM1wvZGJoa2VmMi0wNDgwYjg1OS0wOTJjLTQ3ZmMtYmE3OC01ZjI5OTczNjk5N2UuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.tNrQD0-ER3hxMGn67aqGJm8fSUcTuDFEkXtLgYT9SfU";

export const BUTTON_SETUP = {
    left: {
        type: 'MOVE_LEFT',
        posChange: 1
    },
    up: {
        type: 'MOVE_UP',
        posChange: 5
    },
    right: {
        type: 'MOVE_RIGHT',
        posChange: -1
    },
    down: {
        type: 'MOVE_DOWN',
        posChange: -5
    }
}