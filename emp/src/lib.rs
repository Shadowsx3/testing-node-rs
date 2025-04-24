#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;
use napi::Result;

/// Asynchronously calls https://www.google.com and returns the response body as a string.
///
/// This function uses the async reqwest client. When used via napi,
/// it will return a promise that resolves to the response text.
#[napi]
pub async fn call_google() -> Result<String> {
  let response = reqwest::get("https://www.google.com").await
      .map_err(|e| napi::Error::from_reason(format!("Request error: {}", e)))?;
  let body = response.text().await;

  Ok(String::from(body.unwrap()))
}
