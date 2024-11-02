use rocket::serde::{ self, json::Json, Serialize };
use sea_orm::{prelude::Uuid, ActiveModelTrait, DbBackend, EntityTrait, FromQueryResult, JsonValue, Set, Statement};
use ::serde::Deserialize;
use crate::types::{self, answer};
use sea_orm::ActiveValue::NotSet;
use sea_orm_rocket::Connection;
use crate::database::Db;

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct SubmitAnswerRequest {
    #[serde(rename = "userId")]
    user_id: Uuid,
    #[serde(rename = "isLeft")]
    is_left: bool
}

#[post("/question/<question_id>/answer", format = "application/json", data = "<input>")]
pub async fn submit_answer(
    question_id: &str,
    conn: Connection<'_, Db>,
    input: Json<SubmitAnswerRequest>
) -> Json<AnswerResponse> {

    let question_id = Uuid::parse_str(question_id).unwrap();

    // Store response
    let answer = answer::ActiveModel {
        id: NotSet,
        question_id: Set(question_id),
        user_id: Set(input.user_id),
        is_left: Set(input.is_left)
    };

    let db = conn.into_inner();

    answer.save(db).await.unwrap();

    let unique: Vec<JsonValue> = JsonValue::find_by_statement(Statement::from_sql_and_values(
        DbBackend::Postgres,
        "
        select is_left, COUNT(*) as count from answers
            where question_id = $1
            group by answers.is_left
            order by answers.is_left desc
        ",
        [question_id.into()],
    ))
    .all(db)
    .await
    .unwrap();

    let left_votes = unique.get(0).unwrap().get("count").unwrap().as_number().unwrap().as_f64().unwrap();
    let right_votes = unique.get(1).unwrap().get("count").unwrap().as_number().unwrap().as_f64().unwrap();

    let percentage = (left_votes / right_votes) as f32;

    let response = AnswerResponse {
        percentage
    };

    Json(response)
}

#[derive(Serialize)]
pub struct AnswerResponse {
    percentage: f32
}