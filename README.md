# book_library
Приложение библиотека

Каждый экземпляр книги имеет следующую структуру данных:

{
  id: "string",   -- код книги, внутреннее поле.
  title: "string",
  description: "string",
  authors: "string",
  favorite: "string",
  fileCover: "string",
  fileName: "string",
  fileBook: "string" - добавлено
}

Запуск сервера
npm start

Реализованы методы:

1. POST {{URL}}/api/user/login - авторизация пользователя.
2. GET {{URL}}/api/books- список всех книг. Входных параметров нет.
3. GET {{URL}}/api/books/:id - данные книги по ее id.
4. POST {{URL}}/api/books - добавление книги в библиотеку. Входные параметры описаны выше, кроме поля id.
5. PUT {{URL}}/api/books/:id - редактирование данных книги по ее id. Входные параметры описаны выше, кроме поля id.
6. DELETE {{URL}}/api/books/:id - удаление книги по id.
7. POST {{URL}}/api/books/:id/upload - загрузить файл с книгой по ее id на сервер. Разрешены типы файлов - txt, pdf, fb2, epub. Ограничений на размер файлов нет.
8. GET {{URL}}/api/books/:id/download - скачать книгу по ее id.

С использованием шаблонизатора ejs:

9. GET {{URL}}/ - главная страница.
10. GET {{URL}}/book - список книг.
11. GET {{URL}}/book/:id - данные книги по ее id.
12. GET {{URL}}/book/create - создание книги (вывод  формы ввода данных).
13. POST {{URL}}/book/create - создание книги (сохранение данных с формы ввода).
14. GET {{URL}}/book/update -  редактирование данных книги (вывод  формы редактирования).
15. POST {{URL}}/book/update -  редактирование данных книги (сохранение данных с формы ввода).
16. POST {{URL}}/book/delete -  удаление книги.

{{URL}} - http:/127.0.0.1:3000

