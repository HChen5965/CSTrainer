from loguru import logger
from src.config import config
from src.core.skill_fitting import SkillFitter
from src.core.scientific_question import ScientificQuestionGenerator
from src.core.workflow_planner import WorkflowPlanner
from src.core.hil_feedback import HILFeedback

# Initialize core modules
skill_fitter = SkillFitter()
question_generator = ScientificQuestionGenerator()
workflow_planner = WorkflowPlanner()
hil_feedback = HILFeedback()

def run_cstrainer(user_intent: str, historical_research: str):
    """
    Main execution pipeline of CSTrainer system
    Flow: Intent → Skill Fitting → Question Generation → HIL Feedback → Ontology → Workflow
    """
    logger.info("=== Starting CSTrainer Intelligent Research Support System ===")
    
    # Step 1: Skill template fitting
    skill = skill_fitter.fit_skill(user_intent, historical_research)
    logger.info(f"Generated Skill Template: {skill}")
    
    # Step 2: Generate scientific research questions
    raw_questions = question_generator.generate_questions(user_intent, skill)
    logger.info(f"Generated Candidate Questions: {raw_questions}")
    
    # Step 3: Human-in-the-loop feedback optimization
    final_questions = hil_feedback.feedback_loop(raw_questions)
    logger.info(f"Final Optimized Questions: {final_questions}")
    
    # Step 4: Build ontology and generate execution workflow
    results = {}
    for question in final_questions:
        ontology = workflow_planner.build_ontology(question)
        workflow = workflow_planner.generate_workflow(question, ontology)
        results[question] = {"ontology": ontology, "workflow": workflow}
    
    logger.info("=== CSTrainer Execution Completed Successfully ===")
    return results

if __name__ == "__main__":
    # Test run with sample input
    test_intent = "Research intelligent interpretation methods for tight gas well re-evaluation"
    test_research = "Completed log preprocessing; need improved cross-block generalization"
    output = run_cstrainer(test_intent, test_research)
    print(output)