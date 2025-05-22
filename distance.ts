//% color=65 weight=80 icon="\uf018"
namespace VL53L4CD {
    const I2C_ADDR = 0x29

    function writeReg8(reg: number, value: number): void {
        let buf = pins.createBuffer(3)
        buf[0] = (reg >> 8) & 0xFF
        buf[1] = reg & 0xFF
        buf[2] = value & 0xFF
        pins.i2cWriteBuffer(I2C_ADDR, buf)
    }

    function writeReg16(reg: number, value: number): void {
        let buf = pins.createBuffer(4)
        buf[0] = (reg >> 8) & 0xFF
        buf[1] = reg & 0xFF
        buf[2] = (value >> 8) & 0xFF
        buf[3] = value & 0xFF
        pins.i2cWriteBuffer(I2C_ADDR, buf)
    }

    function readReg8(reg: number): number {
        let buf = pins.createBuffer(2)
        buf[0] = (reg >> 8) & 0xFF
        buf[1] = reg & 0xFF
        pins.i2cWriteBuffer(I2C_ADDR, buf, false)
        let result = pins.i2cReadBuffer(I2C_ADDR, 1)
        return result[0]
    }

    function readReg16(reg: number): number {
        let buf = pins.createBuffer(2)
        buf[0] = (reg >> 8) & 0xFF
        buf[1] = reg & 0xFF
        pins.i2cWriteBuffer(I2C_ADDR, buf, false)
        let result = pins.i2cReadBuffer(I2C_ADDR, 2)
        return (result[0] << 8) | result[1]
    }

    //% block="initialize VL53L4CD"
    export function init(): void {
        while (readReg8(0x0006) != 0x01) {
            basic.pause(2)
        }
        writeReg8(0x0000, 0x00)
        basic.pause(2)
        writeReg8(0x0000, 0x01)
        basic.pause(2)
        writeReg8(0x002E, 0x01)
    }

    //% block="VL53L4CD distance (mm)"
    export function distance(): number {
        writeReg8(0x0087, 0x01)
        let timeout = 100
        while ((readReg8(0x0089) & 0x01) == 0 && timeout > 0) {
            basic.pause(2)
            timeout--
        }
        if (timeout == 0) return -1
        let dist = readReg16(0x0096)
        writeReg8(0x0086, 0x01)
        return dist
    }
}
