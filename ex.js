async function func() {
  let promise = new Promise((res, rej) => {
    setTimeout(() => res('완료!'), 1000)
  });

  let result = await promise; // (*)

  console.log(result);
}

func();