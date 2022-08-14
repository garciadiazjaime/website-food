const fs = require('fs')
const { CWebp } = require('cwebp')
const debug = require('debug')('app:webp')

async function main() {
    debug('start')
    const dirPath = './static/desayuno'
    const files = fs.readdirSync(dirPath)

    files.forEach(filename => {
        if(!filename.includes('.jpeg')) {
            return
        }

        const encoder = new CWebp(`${dirPath}/${filename}`)
        encoder.quality(70)

        const name = filename.split('.jpeg')[0]
        encoder.write(`./static/desayuno/${name}.webp`)

    })
    debug('done')
}

main()
