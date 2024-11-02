use rocket::serde;

#[serde(crate = "rocket::serde")]
pub struct ErrorMessage {
    pub message: String
}