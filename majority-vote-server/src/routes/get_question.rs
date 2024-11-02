use crate::types::question::{ Entity as QuestionEntity, Model as QuestionModel };
use rocket::serde::json::Json;
use sea_orm::{sea_query::{Func, SimpleExpr}, EntityTrait, Order, QueryOrder};
use sea_orm_rocket::Connection;
use crate::database::Db;

#[get("/question")]
pub async fn get_question(
    conn: Connection<'_, Db>
) -> Json<QuestionModel> {

    let db = conn.into_inner();

    let result = QuestionEntity::find()
        .order_by(SimpleExpr::FunctionCall(Func::random()), Order::Asc)
        .one(db)
        .await;

    let question = result.unwrap().unwrap();

    Json(question)
}