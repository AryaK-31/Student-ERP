const toSnakeCase = (str : string) => (
   str.split(' ').join('_').toLowerCase()                   
)

export default toSnakeCase