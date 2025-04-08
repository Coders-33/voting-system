import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../script/GetData';
import ResultCard from '../Small-components/ResultCard';
import Navbar from '../Small-components/Navbar';
import Footer from './Footer';
import styles from '../Styling/ElectionResult.module.css';
import Preloader from '../Small-components/PreLoader';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';
import { useAuthContext } from '../Context/UserContext';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

interface Winner {
    name: string;
    votes: number;
    party: string;
}

interface WinningPartyPayload {
    name: string;
    votes: number;
}

function ElectionResult() {
    const navigate = useNavigate();
    const [positionWinners, setPositionWinners] = useState<Record<string, Winner>>({});
    const [winnerParty, setWinnerParty] = useState<WinningPartyPayload>();
    const [partyVotes, setPartyVotes] = useState<any>({});
    const [showMain, setShowMain] = useState(false);

    const { MAX_TIME} = useAuthContext();
 
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMain(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        async function fetchFinalResult() {
            try {
                const res = await fetch(`${BACKEND_URL}/votes/get-winner-result`);
                const result = await res.json();
                if (res.ok && result.data) {

                    ElectionResultVotes(result.data);

                } else {
                    console.log(result.error);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchFinalResult();
    }, []);


    function ElectionResultVotes(data: any) {
        const { partyVotes, positionWinners, winningParty } = data;
        setPartyVotes(partyVotes);
        setWinnerParty(winningParty);
        setPositionWinners(positionWinners);

    }


    if (!showMain) return <Preloader />;


    if (Date.now() < MAX_TIME) {
        navigate('/');
        return null;
    }



    const chartData = {
        labels: Object.keys(partyVotes),
        datasets: [
            {
                label: 'Votes by Party',
                data: Object.values(partyVotes),
                backgroundColor: ['#3b82f6', '#facc15', '#a855f7', '#ef4444'],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Party-wise Vote Distribution',
                font: {
                    size: 18,
                },
            },
            datalabels: {
                formatter: (value: number, context: any) => {
                    const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}%`;
                },
                color: '#fff',
                font: {
                    weight: 'bold' as const,
                    size: 14,
                },
            },
        },
    };

    return (
        <div style={{ width: '100vw' }}>
            <Navbar />
            <div className={styles.outerWrapper}>
                <h1 className={styles.heading}>🗳️ Election Results 2025</h1>
                <div className={styles.electionContainer}>
                    <div className={styles.resultCardsContainer}>
                        {Object.entries(positionWinners).map(([key, value]) => (
                            <ResultCard
                                key={key}
                                title={key}
                                partyName={value.party}
                                name={value.name}
                                votes={value.votes}
                            />
                        ))}
                    </div>

                    <div className={styles.chartAndWinnerParty} >
                        <div className={styles.chartWrapper}>
                            <Pie data={chartData} options={chartOptions} />
                        </div>

                        <h2 className={styles.subheading}>
                            🎉 Winning Party: <span className={styles.winnerParty}>{winnerParty?.name}</span>
                        </h2>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ElectionResult;
