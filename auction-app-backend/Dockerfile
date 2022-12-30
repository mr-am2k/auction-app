FROM openjdk:17 as build

WORKDIR /opt/app

COPY mvnw .
COPY .mvn .mvn
RUN chmod 755 /opt/app/mvnw

COPY pom.xml .

RUN ./mvnw dependency:go-offline -B

COPY src src

RUN ./mvnw package -DskipTests


FROM openjdk:17

COPY --from=build /opt/app/target/*.jar /opt/app/app.jar

EXPOSE 8080

CMD ["java", "-jar", "/opt/app/app.jar"]