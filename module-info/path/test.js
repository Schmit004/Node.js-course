import path from 'path';

export function getFullPath(directory, fileName) {
  return path.join(directory, fileName);
}

export function changeExtension(fileName, newExt) {
  // Регулярное выражение для проверки, имеет ли файл только одно расширение и совпадает ли оно с новым
  const singleExtRegex = new RegExp(`^[^.]+\\${newExt}$`);

  // Если файл имеет только одно расширение и оно совпадает с новым, возвращаем его без изменений
  if (singleExtRegex.test(fileName)) {
    return fileName;
  }

  let baseName = fileName;

  // Удаляем все расширения из имени файла (например filename.txt.md.exe)
  while (path.extname(baseName) !== '') {
    baseName = path.basename(baseName, path.extname(baseName));
  }

  return baseName + newExt;
}
