FROM eclipse-temurin:21-jdk-alpine as build
ARG JARFILE=target/*.jar
WORKDIR /app
COPY pom.xml pom.xml
COPY mvnw mvnw
COPY .mvn .mvn
COPY src src
RUN chmod +x ./mvnw
RUN ./mvnw clean install -DSkipTests

FROM eclipse-temurin:21-jdk-alpine
COPY --from=build /app/target/Backend.jar  backendpfaa.jar
EXPOSE 8080
<<<<<<< HEAD
ENTRYPOINT ["java","-jar","backendpfaa.jar"]
=======
ENTRYPOINT ["java","-jar","backendpfaa.jar"] 
>>>>>>> 2817623acd1963c32eab3fa5aa45bdf24cc2fe93
