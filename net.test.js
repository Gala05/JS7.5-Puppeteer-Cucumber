//импортируем функции из модулей lib
const { clickElement, putText, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Тест приложения Идем в кино", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
    await clickElement(page, "body > nav > a:nth-child(2)"); //выбор следующего дня
  });

  test ("Бронирование свободного места на завтра первый сеанс'", async () => {    
    await clickElement(
      page,
      "body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(1)"
    ); //первый фильм, первое время (Зверополис, Зал 1, 00:00)
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(1)"
    ); // выбор места
    await clickElement(page, "body > main > section > button"); //нажать кнопка "Забронировать"

    //проверка перехода на следующую страницу
    const bookingTickets = "Вы выбрали билеты:";
    const actualBookingTickets = await getText(
      page,
      "body > main > section > header > h2"
    );
    expect(actualBookingTickets).toContain(bookingTickets);

/*    await clickElement(page, "body > main > section > div > button"); //нажать кнопку "Получить код бронирования"

    //проверка перехода на следующую страницу
    const elTicket = "Электронный билет";
    const actualElTicket = await getText(
      page,
      "body > main > section > header > h2"
    );
    expect(actualElTicket).toContain(elTicket);*/
  });

  test("Бронирование VIP места на завтра первый сеанс", async () => {    
    await clickElement(
      page,
      "body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(1)"
    ); //первый фильм, первое время (Зверополис, Зал 1, 00:00)
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(4) > span.buying-scheme__chair.buying-scheme__chair_vip"
    ); // выбор места
    await clickElement(page, "body > main > section > button"); //нажать кнопка "Забронировать"

    //проверка перехода на следующую страницу
    const bookingTickets = "Вы выбрали билеты:";
    const actualBookingTickets = await getText(
      page,
      "body > main > section > header > h2"
    );
    expect(actualBookingTickets).toContain(bookingTickets);

    /*await clickElement(page, "body > main > section > div > button"); //нажать кнопку "Получить код бронирования"

    //проверка перехода на следующую страницу
    const elTicket = "Электронный билет";
    const actualElTicket = await getText(
      page,
      "body > main > section > header > h2"
    );
    expect(actualElTicket).toContain(elTicket);*/
  });
});

test("Нельзя купить билет на прошедший сеанс", async () => {
  const position = "body > main > section:nth-child(1) > div:nth-child(2) > ul > li > a"; // текущая дата, первый фильм, сеанс 00:00 
  expect(() =>
    clickElement(page, position).toThrowError(
      "Selector is not clickable: ${position}"
    )
  );
});
