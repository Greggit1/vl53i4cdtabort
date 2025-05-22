# VL53L4CD Distance Sensor MakeCode Extension

This extension provides support for the VL53L4CD Time-of-Flight (ToF) distance sensor for the BBC micro:bit.

## Usage

1. Call `VL53L4CD.init()` once at startup to initialize the sensor.
2. Use `VL53L4CD.distance()` to get the distance in millimeters.

Example:

```typescript
VL53L4CD.init()
basic.forever(() => {
    serial.writeNumber(VL53L4CD.distance())
    serial.writeString("\r\n")
})
```

## Blocks
- **initialize VL53L4CD**: Initializes the sensor.
- **VL53L4CD distance (mm)**: Returns the measured distance in millimeters.

## License
MIT

## Supported targets

* for PXT/microbit
