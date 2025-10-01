#include "DHT.h"

#define DHTPIN 18      // pino do ESP32 conectado ao DHT
#define DHTTYPE DHT22  // ou DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Falha ao ler o sensor!");
    return;
  }

  // Envia para a porta serial em formato JSON
  Serial.print("{\"temp\":");
  Serial.print(t);
  Serial.print(", \"umid\":");
  Serial.print(h);
  Serial.println("}");

  delay(3000); // a cada 2s
}