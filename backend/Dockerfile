FROM openjdk:17
ARG JARFILE=target/*.jar
WORKDIR /app

COPY  /target/Backend.jar  backendpfaa.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","backendpfaa.jar"]