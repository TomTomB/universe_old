class PolygonGenerator {
  private π = Math.PI;

  constructor(private _startAngle: number, private _endAngle: number) {
    this.setStartAngle(_startAngle);
    this.setEndAngle(_endAngle);
  }

  setStartAngle(angle: number) {
    if (angle || angle === 0) {
      this._startAngle = this.convertAngle(angle);
    }
  }

  setEndAngle(angle: number) {
    if (angle || angle === 0) {
      this._endAngle = this.convertAngle(angle);
    }
  }

  convertAngle(angle: number) {
    return (angle * this.π) / 180;
  }

  normalizeAngle(angle: number) {
    return ((angle % (2 * this.π)) + 2 * this.π) % (2 * this.π);
  }

  getAngleFromPercent({
    percent,
    startAngle,
    endAngle,
  }: {
    percent: number;
    startAngle: number;
    endAngle: number;
  }) {
    return startAngle + (endAngle - startAngle) * (percent / 100);
  }

  getPointOnSquare(angle: number) {
    const θ = this.normalizeAngle(angle);

    let xPos = 0;
    let yPos = 0;

    switch (true) {
      case θ < this.π / 4:
      case θ >= (7 * this.π) / 4:
        xPos = 100;
        yPos = 50 - 50 * Math.tan(θ);
        break;
      case θ < (3 * this.π) / 4:
        xPos = 50 + 50 / Math.tan(θ);
        yPos = 0;
        break;
      case θ < (5 * this.π) / 4:
        xPos = 0;
        yPos = 50 + 50 * Math.tan(θ);
        break;
      case θ < (7 * this.π) / 4:
        xPos = 50 - 50 / Math.tan(θ);
        yPos = 100;
        break;
    }

    xPos = Math.round(xPos * 10) / 10;
    yPos = Math.round(yPos * 10) / 10;

    return { xPos: xPos, yPos: yPos };
  }

  generatePolygon(percent: number) {
    const points = this._calculatePolygonPoints(percent)
      .map(function (value) {
        return value.xPos + '% ' + value.yPos + '%';
      })
      .reduce(function (prev, cur) {
        return prev + ', ' + cur;
      });

    return 'polygon(' + points + ')';
  }

  private _calculatePolygonPoints(percent: number) {
    const points = [{ xPos: 50, yPos: 50 }];

    const startAngle = this._startAngle;
    const endAngle = this._endAngle;

    const midAngle = this.getAngleFromPercent({
      startAngle: startAngle,
      endAngle: endAngle,
      percent: percent,
    });
    points.push(this.getPointOnSquare(startAngle));

    let firstCornerCount = 0;
    let firstCornerAngle = 0;
    if (midAngle > startAngle) {
      firstCornerCount = Math.ceil((2 / this.π) * startAngle - 0.5);
      firstCornerAngle = (this.π / 4) * (2 * firstCornerCount + 1);

      for (let i = 0; i < 4; i++) {
        const cornerAngle = firstCornerAngle + (i * this.π) / 2;
        if (cornerAngle < midAngle) {
          points.push(this.getPointOnSquare(cornerAngle));
        } else {
          break;
        }
      }
    } else {
      firstCornerCount = Math.floor((2 * startAngle) / this.π - 0.5);
      firstCornerAngle = (this.π / 4) * (2 * firstCornerCount + 1);

      for (let _i = 0; _i < 4; _i++) {
        const _cornerAngle = firstCornerAngle - (_i * this.π) / 2;
        if (_cornerAngle > midAngle) {
          points.push(this.getPointOnSquare(_cornerAngle));
        } else {
          break;
        }
      }
    }

    points.push(this.getPointOnSquare(midAngle));

    return points;
  }
}

export default PolygonGenerator;
