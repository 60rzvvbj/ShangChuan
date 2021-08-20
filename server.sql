insert into t_user(username, password, user_id) values('191543132', '$2a$10$T3QkEg7qPHR/Tfw7OjvfxO8vebjDGuuo4ouBPtlWQoTw/lOYBm4sa', 2);
insert into t_user(username, password, user_id) values('191543105', '$2a$10$T3QkEg7qPHR/Tfw7OjvfxO8vebjDGuuo4ouBPtlWQoTw/lOYBm4sa', 3);

select username, password, user_id
from t_user;