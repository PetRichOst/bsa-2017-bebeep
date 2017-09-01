import React from 'react';

const FILL_DEFAULT = '#727272';

class DriverIcon extends React.Component {

    render() {
        let { className, fill } = this.props;
        fill = fill !== undefined ? fill : FILL_DEFAULT;

        return (
            <div className={ className }>
                <svg viewBox="0 0 407.98 407.98">
                    <g>
                        <path fill={ fill } d="M203.99,0C91.509,0,0,91.509,0,203.99s91.509,203.99,203.99,203.99c112.481,0,203.991-91.51,203.991-203.99 S316.471,0,203.99,0z M203.99,395.98C98.126,395.98,12,309.853,12,203.99S98.126,12,203.99,12 C309.854,12,395.98,98.126,395.98,203.99S309.854,395.98,203.99,395.98z" />
                        <path fill={ fill } d="M255.663,203.99c0-28.492-23.181-51.673-51.673-51.673s-51.673,23.181-51.673,51.673c0,28.493,23.18,51.674,51.673,51.674 S255.663,232.483,255.663,203.99z M203.99,243.664c-21.875,0-39.673-17.798-39.673-39.674s17.797-39.673,39.673-39.673 s39.673,17.797,39.673,39.673S225.865,243.664,203.99,243.664z" />
                        <path fill={ fill } d="M364.428,241.055c-0.003-0.001-0.011-0.003-0.012-0.003c-40.522-10.813-84.104,0.869-113.729,30.495 c-25.502,25.501-37.796,60.698-33.73,96.568c0,0.001,0.001,0.002,0.001,0.003c0,0.002,0,0.003,0,0.005 c0.351,3.061,2.945,5.317,5.953,5.317c0.229,0,0.46-0.014,0.691-0.04c34.175-3.92,66.017-17.946,92.083-40.563 c25.825-22.407,44.145-51.603,52.978-84.431C369.524,245.208,367.628,241.917,364.428,241.055z M307.821,323.774 c-22.665,19.665-50.024,32.339-79.457,36.878c-1.687-30.075,9.357-59.168,30.809-80.62c25.154-25.156,61.513-35.896,96.169-28.785 C346.596,279.331,330.259,304.306,307.821,323.774z" />
                        <path fill={ fill } d="M43.562,241.052c-0.001,0-0.002,0.001-0.002,0.001c-0.003,0.001-0.006,0.001-0.009,0.002 c-3.2,0.861-5.096,4.153-4.235,7.353c8.833,32.828,27.153,62.023,52.978,84.431c26.066,22.616,57.908,36.643,92.082,40.563 c0.232,0.026,0.463,0.04,0.691,0.04c3.008,0,5.603-2.258,5.954-5.317c0-0.002,0-0.003,0-0.005c0-0.001,0.001-0.002,0.001-0.003 c4.066-35.869-8.228-71.067-33.729-96.568C127.666,241.921,84.088,230.236,43.562,241.052z M179.614,360.652 c-29.433-4.538-56.792-17.213-79.456-36.878c-22.438-19.468-38.776-44.443-47.521-72.527c34.654-7.111,71.014,3.63,96.17,28.785 C170.258,301.483,181.302,330.578,179.614,360.652z" />
                        <path fill={ fill } d="M323.745,82.602c-32.111-31.684-74.642-49.133-119.756-49.133S116.345,50.918,84.232,82.602 c-32.08,31.652-50.101,73.879-50.743,118.901c-0.036,2.548,1.54,4.84,3.931,5.718c0.676,0.249,1.375,0.368,2.067,0.368 c1.757,0,3.468-0.772,4.63-2.183c35.761-43.36,95.526-69.247,159.871-69.247c64.345,0,124.109,25.887,159.871,69.247 c1.621,1.966,4.306,2.691,6.697,1.814c2.392-0.878,3.968-3.17,3.931-5.718C373.847,156.481,355.825,114.254,323.745,82.602z M203.989,124.16c-61.308,0-118.816,22.444-157.385,60.743c4.237-35.489,20.255-68.301,46.057-93.759 c29.852-29.454,69.389-45.675,111.329-45.675s81.477,16.221,111.328,45.675c25.802,25.458,41.82,58.27,46.058,93.759 C322.805,146.604,265.297,124.16,203.989,124.16z" />
                    </g>
                </svg>
            </div>
        )
    }
}

export default DriverIcon;