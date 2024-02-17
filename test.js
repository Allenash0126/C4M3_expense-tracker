const datas = [
  {
    name: 'Casper',
    like: '鍋燒意麵',
    age: 18
  },
  {
    name: 'Wang',
    like: '炒麵',
    age: 24
  }, 
  {
    name: 'Bobo',
    like: '蘿蔔泥',
    age: 1
  },
  {
    name: 'Allen',
    like: '蘿蔔泥s',
    age: 50
  },
  {
    name: 'Berry',
    like: '蘿蔔泥sg',
    age: 80
  },
  {
    name: '滷蛋',
    like: '蘿蔔泥',
    age: 3
  }
];

const newDatas = datas.filter((data) => {
  return data.like.includes('泥')
})
console.log(newDatas) 