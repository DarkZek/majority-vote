use rocket::serde::Serialize;
use sea_orm::entity::prelude::*;
use rocket::serde::Deserialize;

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Deserialize, Serialize)]
#[serde(crate = "rocket::serde")]
#[sea_orm(table_name = "answers")]
pub struct Model {
    #[sea_orm(primary_key)]
    #[serde(rename = "answerId")]
    pub id: String,
    #[serde(rename = "questionId")]
    pub question_id: String,
    #[serde(rename = "userId")]
    pub user_id: String,
    #[serde(rename = "isLeft")]
    pub is_left: bool,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}