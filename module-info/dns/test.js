import dns from 'dns';

// Асинхронное разрешение доменного имени в IP-адрес #1
export async function resolveDomain1(domain) {
  try {
    const addresses = await dns.promises.resolve4(domain);
    console.log(`IP addresses: ${addresses}`);
  } catch (err) {
    throw err;
  }
}

// Асинхронное разрешение доменного имени в IP-адрес #2
export function resolveDomain2(domain) {
  dns.resolve4(domain, (err, addresses) => {
    if (err) throw err;
    console.log(`IP addresses: ${addresses}`);
  });
}

// Обратное разрешение IP-адреса
export function reverseLookup(ip) {
  dns.reverse(ip, (err, hostnames) => {
    if (err) throw err;
    console.log(`Hostnames: ${hostnames}`);
  });
}

// Запрос MX-записей
export function resolveMxRecords(domain) {
  dns.resolveMx(domain, (err, addresses) => {
    if (err) throw err;
    console.log('MX records:', addresses);
  });
}

// Запрос TXT-записей
export function resolveTxtRecords(domain) {
  dns.resolveTxt(domain, (err, records) => {
    if (err) {
      console.error(`Ошибка при получении TXT записей для ${domain}: ${err.message}`);
      return;
    }
    console.log(`TXT записи для домена ${domain}:`, records);
  });
}

// Установка пользовательских DNS-серверов и выполнение запроса
export function resolveWithCustomServers(domain, servers) {
  dns.setServers(servers);
  dns.resolve4(domain, (err, addresses) => {
    if (err) {
      console.error(`Ошибка при выполнении запроса c использованием пользовательских серверов: ${err.message}`);
      return;
    }
    console.log(`IP addresses: ${addresses}`);
  });
}
