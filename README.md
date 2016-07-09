# 4wd_car_driver
This is a 4WD car driver for ruff, use L293D module

## usage
### forward()
make the car go forward, the effect may be back, so you should exchange the line connect to motor

### backward()
the same like `forward`, just the opposite effect.

### left(range)
range is between 0 and 1.
set to 1 means use current speed total to turn left.

### right(range)
the same like `left`, just the opposite effect.

### setSpeed(v)
v is between 0 and 1.
set to 1 means full speed