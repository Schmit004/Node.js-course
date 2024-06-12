import ExcelJS from 'exceljs';

// Создание нового рабочего листа
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Airdrop Data');

// Добавление заголовков
worksheet.columns = [
  { header: 'Address', key: 'address', width: 50 },
  { header: 'ZK Airdrop Amount', key: 'zk_airdrop', width: 20 },
  { header: 'ARB Airdrop Amount', key: 'arb_airdrop', width: 20 },
  { header: 'OP Airdrop Amount', key: 'op_airdrop', width: 20 },
];

// Добавление данных
const data = [
  { address: '0xe4fb9ca52E39B83BE69E74E7Fac8f807A9c16eF9', zk_airdrop: '100,000', arb_airdrop: '10,250', op_airdrop: '17,007' },
  { address: '0x64f8e38e19c1B69992969Dcd5769c149951018Af1', zk_airdrop: '100,000', arb_airdrop: '6,750', op_airdrop: '17,007' },
  { address: '0xD66164C4B658f3704b5cAA67b33f07F3842EE063', zk_airdrop: '100,000', arb_airdrop: '7,000', op_airdrop: '17,007' },
  { address: '0x506ac1D1bD4e32F4Ed85D1DF33d267E06533dC67', zk_airdrop: '100,000', arb_airdrop: '7,250', op_airdrop: '17,007' },
  { address: '0x7d70a3883F0b851c90Cf4662018006CEE9aa50FBa2', zk_airdrop: '100,000', arb_airdrop: '6,750', op_airdrop: '17,007' },
  { address: '0xA8c4e3ce1743D0f2A6c227548C98a7C40569940', zk_airdrop: '100,000', arb_airdrop: '8,250', op_airdrop: '17,007' },
  { address: '0xb90781Ceb500f80A9c101225eD5415449a3a5bc', zk_airdrop: '100,000', arb_airdrop: '10,250', op_airdrop: '17,007' },
  { address: '0x049808d5EAA90a2665b9703d2246DDe34F1EB73', zk_airdrop: '108,721', arb_airdrop: '8,250', op_airdrop: '17,007' },
  { address: '0x30bF85E1d0bC7FDEDcbEeF39225D8037c0b0b7c', zk_airdrop: '100,000', arb_airdrop: '7,250', op_airdrop: '17,007' },
  { address: '0x196a37946C3D93e9A5309f539ae28b774a32411F', zk_airdrop: '104,806', arb_airdrop: '10,250', op_airdrop: '17,007' },
];

data.forEach((item) => {
  worksheet.addRow(item);
});

// Сохранение файла
workbook.xlsx.writeFile('AirdropData.xlsx')
  .then(() => {
    console.log('Excel file created successfully');
  })
  .catch((error) => {
    console.error('Error creating Excel file:', error);
  });
