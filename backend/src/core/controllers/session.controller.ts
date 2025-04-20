import appAssert from "../../common/API/AppAssert";
import { NOT_FOUND, OK } from "../../common/constants/http";
import prisma from "../../database/dbConnect";
import asyncHandler from "../../middlewares/asyncHandler.middleware";

export const getSessionsHandler = asyncHandler(async (req, res) => {
  const sessions = await prisma.session.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "desc" },
  });

  appAssert(sessions, NOT_FOUND, "Session not found");

  return res.status(OK).json({
    session: sessions.map((session) => ({
      ...session,
      ...(session.id === req.sessionId && {
        isCurrect: true,
      }),
    })),
    success: true,
  });
});

export const deleteSessionsHandler = asyncHandler(async (req, res) => {
  const session = await prisma.session.delete({
    where: { id: req.params.id, userId: req.userId },
  });

  appAssert(session, NOT_FOUND, "session not Found or Already deleted");

  return res
    .status(OK)
    .json({ message: "Session deleted successfully", success: true });
});
