// // describe('Test the rendering of dynamic blog and review cards', () => {
// //   it('Test if parseString converts String to JSON data', () => {
// //     let marco = new MarcoBlogs('/data/data.json');
// //     console.log(marco);
// //     let data = '{"array":["Key":"Value"]}';
// //     expect(marco.parseString(data,"array")).toBe({"Key":"Value"});
// //   })});
//
// describe('Testing Marco Blog Class', ()=>{
//   it('should accept a json URL to fetch data from, else throw an error', ()=>{
//     let jsonURL;
//     let todo = new MarcoBlogs(jsonURL);
//     let done = false;
//     if(todo.constructor.toString() !== "function Error() { [native code] }") {
//       done = true;
//     }
//     expect(done).toBe(false);
//   })
//   it('should accept a string and return an array of JSON objects', ()=>{
//     let todo = new MarcoBlogs('data/data.json');
//     let item = {
//       "array" : [
//         {
//           "title": "get milk"
//         }
//       ]
//     };
//     let done = todo.parseString(JSON.stringify(item), "array");
//     expect(done.length).toBe(1);
//   })
// })
