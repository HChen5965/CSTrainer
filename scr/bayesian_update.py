class BayesianUpdater:
    """Bayesian inference engine for agent confidence and trust updates"""
    def __init__(self):
        self.prior_probability = 0.5  # Default prior confidence

    def compute_posterior(self, valid_votes: int, total_judges: int, is_correct: bool) -> float:
        """Calculate posterior probability P(correct|valid_votes)"""
        p_correct = self.prior_probability
        p_votes_given_correct = valid_votes / total_judges if is_correct else 0.2
        p_votes_given_incorrect = 1 - p_votes_given_correct

        numerator = p_votes_given_correct * p_correct
        denominator = numerator + p_votes_given_incorrect * (1 - p_correct)
        
        return numerator / denominator if denominator != 0 else 0.5

    def update_agent_confidence(self, current_conf: float, sigma: float, valid_votes: int, weight: float) -> float:
        """Weighted Bayesian confidence update: Pi(t+1) = Pi(t) * [ω*P + (1-ω)*σi]"""
        posterior = self.compute_posterior(valid_votes, 3, True)
        return current_conf * (weight * posterior + (1 - weight) * sigma)