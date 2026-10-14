import express from 'express'
import isNotNumber from './utils.ts'
import calculateBmi from './bmiCalculator.ts'

const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query
    if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
        res.status(400).json({error: "malformatted parameters"})
        return
    }

    const heightNum = Number(height)
    const weightNum = Number(weight)

    res.json({
        height: heightNum,
        weight: weightNum,
        bmi: calculateBmi(heightNum, weightNum)
    })

})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})