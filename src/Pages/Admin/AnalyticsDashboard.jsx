import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; 
import { getAdminDashboardAnalytics, getUserReport, getTenderReport } from '../../api/analyticsApi';
import DashboardLinkButton from '../../components/DashboardLinkButton'; // <-- ADDED

function AnalyticsDashboard() {
    const [dashboardData, setDashboardData] = useState({});
    const [userReport, setUserReport] = useState(null);
    const [tenderReport, setTenderReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                // Req 14a
                const dashboard = await getAdminDashboardAnalytics();
                setDashboardData(dashboard);
                
                // Req 14b
                const userRep = await getUserReport();
                setUserReport(userRep);
                
                // Req 14c
                const tenderRep = await getTenderReport();
                setTenderReport(tenderRep);

                setError(null);
            } catch (err) {
                console.error("Failed to fetch analytics:", err);
                // The API call failed. The error message is correct but confirms a backend issue.
                setError('Failed to load analytics data. Ensure backend endpoints are running and returning valid JSON.');
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <div className="p-8">Loading Analytics...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    // Helper to format currency/numbers
    const formatNumber = (num) => num?.toLocaleString() || '0';

    return (
        <div className="p-8">
            <DashboardLinkButton /> {/* <-- ADDED */}
            <h1 className="text-3xl font-bold mb-6 text-red-700">Admin: Platform Analytics & Reports (Req 14)</h1>
            <p className="mb-8 text-gray-600">Overview of key platform metrics.</p>

            {/* Dashboard Metrics (Req 14a) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <MetricCard title="Total Registered Users" value={formatNumber(dashboardData.totalUsers)} icon="👤" colorKey="blue" />
                <MetricCard title="Active Tenders" value={formatNumber(dashboardData.activeTenders)} icon="📄" colorKey="purple" />
                <MetricCard title="Total Proposals Submitted" value={formatNumber(dashboardData.totalProposals)} icon="📨" colorKey="green" />
                <MetricCard title="Clients" value={formatNumber(dashboardData.clientCount)} icon="💼" colorKey="indigo" />
                <MetricCard title="Vendors" value={formatNumber(dashboardData.vendorCount)} icon="🛠️" colorKey="teal" />
                <MetricCard title="Tenders Created Last 30 Days" value={formatNumber(dashboardData.tendersLast30Days)} icon="🗓️" colorKey="orange" />
            </div>

            {/* User Report (Req 14b) */}
            {userReport && (
                <ReportSection title="User Activity Report (Req 14b)" colorKey="indigo">
                    <p>New registrations last week: <span className="font-semibold">{formatNumber(userReport.newUsersLastWeek)}</span></p>
                    <p>Total Deactivated Accounts: <span className="font-semibold">{formatNumber(userReport.deactivatedUsers)}</span></p>
                </ReportSection>
            )}

            {/* Tender Report (Req 14c) */}
            {tenderReport && (
                <ReportSection title="Tender Performance Report (Req 14c)" colorKey="green">
                    <p>Tenders awaiting moderation: <span className="font-semibold">{formatNumber(tenderReport.awaitingModeration)}</span></p>
                    <p>Average proposals per tender: <span className="font-semibold">{tenderReport.avgProposalsPerTender?.toFixed(1) || 'N/A'}</span></p>
                </ReportSection>
            )}
        </div>
    );
}

// Map color keys to explicit Tailwind classes
const colorMap = {
    blue: { border: 'border-blue-500', text: 'text-blue-600', header: 'text-blue-800' },
    purple: { border: 'border-purple-500', text: 'text-purple-600', header: 'text-purple-800' },
    green: { border: 'border-green-500', text: 'text-green-600', header: 'text-green-800' },
    indigo: { border: 'border-indigo-500', text: 'text-indigo-600', header: 'text-indigo-800' },
    teal: { border: 'border-teal-500', text: 'text-teal-600', header: 'text-teal-800' },
    orange: { border: 'border-orange-500', text: 'text-orange-600', header: 'text-orange-800' },
};

// Helper components for clean layout
const MetricCard = ({ title, value, icon, colorKey = 'blue' }) => {
    const { border, text } = colorMap[colorKey];
    return (
        <div className={`p-4 bg-white rounded-lg shadow-md border-l-4 ${border} flex items-center`}>
            <div className={`text-4xl mr-4 ${text}`}>{icon}</div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
        </div>
    );
};

// PropType validation for MetricCard
MetricCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.string.isRequired,
    colorKey: PropTypes.string,
};

const ReportSection = ({ title, children, colorKey = 'blue' }) => {
    const { header, border } = colorMap[colorKey];
    return (
        <div className={`mb-8 p-6 bg-white rounded-lg shadow-xl border-t-4 ${border}`}>
            <h2 className={`text-2xl font-bold mb-4 ${header}`}>{title}</h2>
            <div className="space-y-2 text-gray-700">
                {children}
            </div>
        </div>
    );
};

// PropType validation for ReportSection
ReportSection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    colorKey: PropTypes.string,
};

export default AnalyticsDashboard;