FROM openjdk:21 as build
ARG JARFILE=target/*.jar
WORKDIR /app
CMD ./mvnw clean package -f pom.xml

FROM build
COPY --from=build /app/target/Backend.jar  backendpfaa.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","backendpfaa.jar"]