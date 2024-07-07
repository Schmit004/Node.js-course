import EventEmitter from 'events';
import chalk from 'chalk';

const myEmitter = new EventEmitter();

// Функция для регистрации слушателя событий
export function registerEventListener(eventType, eventListener) {
  // Получаем все слушатели для данного события
  const listeners = myEmitter.listeners(eventType);

  // Проверяем, не зарегистрирован ли уже этот слушатель
  if (listeners.includes(eventListener)) {
    console.warn(chalk.bold.yellow(`Listener is already registered for event: ${eventType}`));
    return;
  }

  // Регистрируем слушателя, если он не был зарегистрирован
  myEmitter.on(eventType, eventListener);
  console.log(`Listener registered for event: ${eventType}`);
}

// Функция для генерации события
export function triggerEvent(eventType, data) {
  myEmitter.emit(eventType, data);
}

// Функция для удаления слушателей событий
export function removeEventListener(eventType, eventListener) {
  // Проверяем, есть ли зарегистрированные слушатели для данного события
  if (myEmitter.listenerCount(eventType) === 0) {
    console.warn(chalk.bold.yellow(`No listeners registered for event: ${eventType}`));
    return;
  }

  // Проверяем, зарегистрирован ли конкретно этот слушатель
  const listeners = myEmitter.listeners(eventType);
  if (!listeners.includes(eventListener)) {
    console.warn(chalk.bold.yellow(`Listener not found for event: ${eventType}`));
    return;
  }

  // Удаление слушателя
  myEmitter.removeListener(eventType, eventListener);
  console.log(`Listener removed for event: ${eventType}`);
}
