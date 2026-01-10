def calculate_trust(on_time, cost_efficiency, success_rate):
    return round(
        (0.4 * on_time + 0.3 * cost_efficiency + 0.3 * success_rate), 2
    )
