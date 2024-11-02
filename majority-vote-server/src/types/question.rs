use rocket::serde::Serialize;
use sea_orm::entity::prelude::*;
use rocket::serde::Deserialize;

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Deserialize, Serialize)]
#[serde(crate = "rocket::serde")]
#[sea_orm(table_name = "questions")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    #[serde(rename = "questionId")]
    pub id: Uuid,
    pub statement: String,
    #[serde(rename = "leftOption")]
    pub left_option: String,
    #[serde(rename = "rightOption")]
    pub right_option: String,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}