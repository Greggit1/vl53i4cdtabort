VL53L4CD.init()
basic.forever(() => {
    serial.writeNumber(VL53L4CD.distance())
    serial.writeString("\r\n")
})
