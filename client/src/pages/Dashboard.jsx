import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";

function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { goals, isLoading, isError, message } = useSelector(
		(state) => state.goals
	);
	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (!user) {
			navigate("/login");
		}
		dispatch(getGoals());
		return () => {
			dispatch(reset());
		};
	}, [user, navigate, dispatch, isError, message]);
	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<section className="heading">
				<h1>Welcome {user && user.name}</h1>
				<p>Goal Dashboard</p>
			</section>
			<GoalForm />
			<section className="content">
				{goals.length > 0 ? (
					<div className="goals">
						{goals.map((goal) => (
							<GoalItem key={goal._id} goal={goal} />
						))}
					</div>
				) : (
					<h3>You have not set any goals</h3>
				)}
			</section>
		</>
	);
}
export default Dashboard;