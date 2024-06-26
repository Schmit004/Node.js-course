## Переменные окружения в Node.js
**Переменные окружения** — одна из фундаментальных конструкций среды Node.js. Они представляют собой механизм передачи в приложение информации, которую разработчик не хочет жёстко задавать в коде. В этом контексте переменные окружения, больше похожи на «Параметры конфигурации» (Configuration Settings).

Переменные окружения можно указать в терминале, в котором планируется запускать Node. Как это сделать, зависит от операционной системы.
В Linux или macOS (в терминале):
```bash
export MY_VARIABLE=myValue
node myscript.js
```

После установки переменной окружения можно получить к ней доступ в Node.js скрипте с помощью `process.env`:
```javascript
console.log(process.env.MY_VARIABLE);
```

Также можно установить переменные окружения непосредственно при запуске скрипта:

В Linux или macOS (в терминале):

```bash
MY_VARIABLE=myValue node myscript.js
```

Этот способ удобен для временного установления переменных окружения, которые будут доступны только во время выполнения данной команды.
Но такой подход не совсем удобен, когда нужно установить большое количество переменных окружения.
Оптимальным вариантом является создание в проекте файла с именем `.env` и внесение в него переменных окружения, начиная каждую с новой строки. Читать эти значения можно разными способами. Проще всего — с помощью пакета `dotenv` из npm. После установки пакета его нужно подключить к проекту, а затем им можно пользоваться для работы с переменными окружения. Этот пакет найдёт файл `.env` и загрузит переменные, описанные в нём, в Node.

## dotenv

Библиотека `dotenv` в Node.js используется для управления переменными окружения вашего проекта. Она позволяет загружать переменные окружения из файла `.env` в `process.env`, обеспечивая простой доступ к ним в любом месте вашего приложения. Вот основные причины, по которым вы можете использовать `dotenv`:

### Упрощение конфигурации

`dotenv` позволяет централизованно управлять конфигурацией вашего приложения. Вместо того чтобы жестко кодировать конфигурационные данные в исходном коде или использовать различные механизмы для разных сред выполнения, вы можете определить все необходимые настройки в одном файле `.env`. Это упрощает конфигурацию и изменение настроек без необходимости перекомпиляции или перезапуска приложения.

### Безопасность

Хранение конфигурационных данных, таких как секретные ключи, пароли от баз данных и API-токены, в файле `.env` помогает избежать их случайного попадания в систему контроля версий (например, git). Это важно для поддержания безопасности вашего приложения, так как такие данные не должны быть доступны публично или распространяться с исходным кодом. Обычно файл `.env` добавляется в `.gitignore`, чтобы исключить его из репозитория.

### Гибкость

Использование `dotenv` обеспечивает гибкость в управлении настройками для различных сред выполнения (разработка, тестирование, продакшн). Вы можете иметь разные файлы `.env` для разных сред, например, `.env.development`, `.env.test`, `.env.production`, и загружать соответствующие настройки в зависимости от среды, в которой запущено ваше приложение.

### Простота использования

`dotenv` прост в использовании и интеграции в любой Node.js проект. Достаточно добавить несколько строк кода в начало вашего основного файла приложения для загрузки переменных окружения, и вы сразу же сможете использовать их в коде.

Все эти преимущества делают `dotenv` популярным выбором для управления конфигурацией в проектах Node.js, обеспечивая безопасную, гибкую и удобную работу с переменными окружения.
