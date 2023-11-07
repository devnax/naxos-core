import React, { Component } from 'react';

class ResizableDivs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isResizing: false,
            resizingIndex: -1,
            initialX: 0,
            initialWidth: 0,
        };

        this.divs = [
            { id: 1, width: 200 },
            { id: 2, width: 200 },
            { id: 3, width: 200 },
        ];
    }

    handleMouseDown = (index, e) => {
        this.setState({
            isResizing: true,
            resizingIndex: index,
            initialX: e.clientX,
            initialWidth: this.divs[index].width,
        });

        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseMove = (e) => {
        if (this.state.isResizing) {
            const dx = e.clientX - this.state.initialX;
            const newWidth = this.state.initialWidth + dx;


            if (newWidth >= 50) { // Minimum width to prevent excessive resizing
                const newDivs = [...this.divs];
                newDivs[this.state.resizingIndex].width = newWidth;
                this.setState({ isResizing: true, resizingIndex: this.state.resizingIndex });
                this.divs = newDivs;
            }
        }
    }

    handleMouseUp = () => {
        this.setState({ isResizing: false, resizingIndex: -1 });

        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    render() {
        return (
            <div className="resizable-divs">
                {this.divs.map((div, index) => (
                    <div
                        key={div.id}
                        className="resizable-div"
                        style={{ width: div.width + 'px', height: 300 }}
                    >
                        <div
                            className="resizer"
                            onMouseDown={(e) => this.handleMouseDown(index, e)}
                        ></div>
                    </div>
                ))}
            </div>
        );
    }
}

export default ResizableDivs;
