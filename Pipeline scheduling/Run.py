from src.app import run_cstrainer

result = run_cstrainer(
    user_intent="Discover unknown problems in transnational natural gas pipeline scheduling and provide optimization solutions.",
    historical_research="6-year SCADA data from 6 cross-border pipelines; existing methods lack coupled risk modeling."
)

print(result)