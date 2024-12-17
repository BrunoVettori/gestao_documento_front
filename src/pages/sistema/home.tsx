import Pannel from '@/components/self/pannel';

function Home() {
    return (
        <Pannel className="h-full w-full grid grid-cols-2 grid-rows-2 p-2 gap-2">
            <div className="w-full h-full max-w-[100%] max-h-[100%] border-[1px] border-system_gray_300 rounded-sm shadow-md contain-strict">
                <img
                    className="h-full mr-auto ml-auto"
                    src="https://cdn.prod.website-files.com/621e95f9ac30687a56e4297e/64a8d6019c1edf566bc4f719_V2_1675967577563_18c10042-3799-4d69-b285-abb6ad68ba3d.png"
                    alt=""
                />
            </div>
            <div className="w-full h-full max-w-[100%] max-h-[100%] border-[1px] border-system_gray_300 rounded-sm shadow-md contain-strict">
                <img
                    className="w-full h-full"
                    src="https://static.anychart.com/images/gallery/v8/bar-charts-100-percent-stacked-bar-chart.png"
                    alt=""
                />
            </div>
            <div className="w-full h-full max-w-[100%] max-h-[100%] border-[1px] border-system_gray_300 rounded-sm shadow-md contain-strict">
                <img
                    className="w-full h-full"
                    src="https://www.tableau.com/sites/default/files/2021-09/Line%20Chart%201%20-%20Bad%20-%20900x650.png"
                    alt=""
                />
            </div>
            <div className="w-full h-full max-w-[100%] max-h-[100%] border-[1px] border-system_gray_300 rounded-sm shadow-md contain-strict">
                <img
                    className="h-full w-full"
                    src="https://www.marketdataforecast.com/images/mdf-Generic-Drugs-Market.webp"
                    alt=""
                />
            </div>
        </Pannel>
    );
}

export default Home;
