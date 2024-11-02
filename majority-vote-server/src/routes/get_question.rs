use crate::types::question::{ Entity as QuestionEntity, Model as QuestionModel };
use rocket::serde::json::Json;
use sea_orm::{prelude::Uuid, DbBackend, EntityTrait, Statement};
use sea_orm_rocket::Connection;
use crate::database::Db;

#[get("/question?<userId>")]
pub async fn get_question(
    conn: Connection<'_, Db>,
    userId: String
) -> Json<QuestionModel> {

    let user_id = Uuid::parse_str(&userId).unwrap();

    let db = conn.into_inner();

    let result = QuestionEntity::find()
        .from_raw_sql(Statement::from_sql_and_values(
            DbBackend::Postgres,
            "
                SELECT q.*
                FROM questions q
                LEFT JOIN answers a ON q.id = a.question_id AND a.user_id = $1
                WHERE a.question_id IS NULL
                ORDER BY random()
            ",
            [user_id.into()]
        ))
        .one(db)
        .await;

    println!("{:?}", result);

    let question = result.unwrap().unwrap();

    Json(question)
}