FROM amazoncorretto:17.0.9

ARG JAR_FILE=target/rentalInstruments-0.0.1-SNAPSHOT.jar

WORKDIR /app

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","app.jar", "com/rentalInstruments/rentalInstruments/RentalInstrumentsApplication"]

EXPOSE 8080