new Promise((res, rej) => {
  console.log('출발');
  setTimeout(() => {
    console.log('도착');
    res("활동을 합니다");
  }, 1000);
})
.then((res) => {
  console.log(res);
})
.finally(() => {
  console.log('집에 갑니다');
})