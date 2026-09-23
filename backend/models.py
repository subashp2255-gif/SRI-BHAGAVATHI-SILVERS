from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base


class MetalRate(Base):
    __tablename__ = "metal_rates"

    id = Column(Integer, primary_key=True, index=True)
    metal = Column(String(50), unique=True, index=True, nullable=False)
    rate = Column(Float, nullable=False)
    unit = Column(String(20), default="INR/gram", nullable=False)
    source = Column(String(50), default="MJDTA", nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)


class MetalRateHistory(Base):
    __tablename__ = "metal_rate_history"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    metal = Column(String(50), nullable=False)
    rate = Column(Float, nullable=True)
    unit = Column(String(20), default="INR/gram", nullable=False)
    source = Column(String(50), default="MJDTA", nullable=False)
    fetched_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    status = Column(String(20), default="success", nullable=False)
    error_message = Column(String(255), nullable=True)
