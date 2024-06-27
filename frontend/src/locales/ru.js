const ru = {
    translation: {
      languages: {
        ru: 'Русский',
      },
      loginPage: {
        loginImg: 'Войти',
        form: {
          header: 'Войти',
          username: 'Ваш ник',
          password: 'Пароль',
          loginButton: 'Войти',
          footer: 'Нет аккаунта? ',
          footerRegistrationLink: 'Регистрация',
        },
        errors: {
          usernameRequired: 'Обязательное поле',
          passwordRequired: 'Обязательное поле',
          wrongData: 'Неверные имя пользователя или пароль',
          network: 'Ошибка сети',
          unknown: 'Неизвестная ошибка',
        },
      },
      homePage: {
        logOutButton: 'Выйти',
        channels: 'Каналы',
        createNewChannel: 'Создать новый канал',
        setupChannel: 'Управление каналом',
        newMessagePlaceholder: 'Введите сообщение...',
        sendMessageButton: 'Отправить сообщение',
        newMessageInput: 'Новое сообщение',
        messageCount: {
          message_zero: '{{count}} сообщений',
          message_one: '{{count}} сообщение',
          message_few: '{{count}} сообщения',
          message_many: '{{count}} сообщений',
        },
        modals: {
          addNewChannelHeader: 'Добавить канал',
          newChannelName: 'Имя канала',
          renameChannelHeader: 'Переименовать канал',
          deleteChannelHeader: 'Удалить канал',
          deleteChannelBody: 'Уверены?',
          confirmButton: 'Отправить',
          declineButton: 'Отменить',
          deleteButton: 'Удалить',
          deleteDropMenu: 'Удалить',
          renameDropMenu: 'Переименовать',
          errors: {
            shortChannelName: 'От 3 до 20 символов',
            longChannelName: 'От 3 до 20 символов',
            requiredField: 'Обязательное поле',
            uniqueName: 'Должно быть уникальным',
          },
        },
        notifications: {
          success: {
            addChannel: 'Канал создан',
            renameChannel: 'Канал переименован',
            removeChannel: 'Канал удалён',
          },
        },
      },
      signupPage: {
        form: {
          header: 'Регистрация',
          username: 'Имя пользователя',
          password: 'Пароль',
          passwordConfirm: 'Подтвердите пароль',
          registrationButton: 'Зарегистрироваться',
          image: 'Войти',
        },
        errors: {
          shortUserName: 'От 3 до 20 символов',
          longUserName: 'От 3 до 20 символов',
          shortPassword: 'Не менее 6 символов',
          passwordMatch: 'Пароли должны совпадать',
          requiredField: 'Обязательное поле',
          userExists: 'Такой пользователь уже существует',
          network: 'Ошибка сети',
          unknown: 'Неизвестная ошибка',
        },
      },
      notFoundPage: {
        header: 'Страница не найдена',
        body: 'Но вы можете перейти',
        link: 'на главную страницу',
      },
    },
  };
  
  export default ru;