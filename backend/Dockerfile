FROM openjdk:21 as build
ARG JARFILE=target/*.jar
WORKDIR /app
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src src
RUN chmod +x ./mvnw & ./mvnw package -DSkipTests

FROM eclipse-temurin:20-jdk-alpine
COPY --from=build /app/target/Backend.jar  backendpfaa.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","backendpfaa.jar"] 
