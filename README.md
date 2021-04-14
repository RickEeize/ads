Потребуется npm, jdk11, mysql

Создать базу данных и структуру таблиц
mysql -h {host} -u {user} -p{password} < {project_dir}\src\main\resources\schema.sql


Backend:
В application.properties изменить параметры доступа к бд
Сборка
{project_dir} .\gradlew build
Запуск
{project_dir}\build\libs java -jar ads-0.0.1-SNAPSHOT.jar


Frontend:
Собрать и запустить
{project_dir}\src\main\webapp\ads npm run build
{project_dir}\src\main\webapp\ads npm install -g serve
{project_dir}\src\main\webapp\ads serve -s build
