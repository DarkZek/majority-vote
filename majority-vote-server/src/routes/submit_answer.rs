use rocket::serde::{ json::Json, Serialize };

#[post("/question/:id/answer")]
pub fn submit_answer() -> Json<AnswerResponse> {
    let response = AnswerResponse {
        percentage: 0.4
    };

    Json(response)
}

#[derive(Serialize)]
pub struct AnswerResponse {
    percentage: f32
}