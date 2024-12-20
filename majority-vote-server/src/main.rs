mod types;
mod routes;
mod database;

use database::Db;
use rocket_cors::CorsOptions;
use routes::submit_answer::submit_answer;
use sea_orm_rocket::Database;
use crate::routes::get_question::get_question;

#[macro_use] extern crate rocket;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .configure(rocket::Config::figment().merge(("port", 3000)))
        .attach(Db::init())
        // .attach(AdHoc::try_on_ignite("Migrations", run_migrations))
        .attach(CorsOptions::default().to_cors().unwrap())
        .mount("/", routes![get_question, submit_answer])
}