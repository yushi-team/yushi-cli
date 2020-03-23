module.exports = (obj) => {
    let {template, brandName} = obj
    let pkgJson = {}
    let str1 = ''
    if (template === 'oms') {
        pkgJson = {
            "element-ui": "^2.13.0"
        }
    }
    if (template === 'h5') {
        pkgJson = {
            "vant": "^2.5.5"
        }
    }
    return {str1, pkgJson}
}